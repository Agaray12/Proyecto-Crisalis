package com.crisalis.project.services.impl;

import com.crisalis.project.mappers.OrderMapper;
import com.crisalis.project.models.*;
import com.crisalis.project.models.dto.request.order.OrderDetailRequest;
import com.crisalis.project.models.dto.request.order.OrderRequest;
import com.crisalis.project.models.dto.request.order.OrderUpdateRequest;
import com.crisalis.project.models.dto.response.order.OrderDetailResponse;
import com.crisalis.project.models.dto.response.order.OrderResponse;
import com.crisalis.project.repositories.OrderDetailRepository;
import com.crisalis.project.repositories.OrderRepository;
import com.crisalis.project.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ClientServiceImpl clientService;

    @Autowired
    private GoodServiceImpl goodService;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Override
    public List<OrderResponse> getAll() {
        return orderRepo.findAll().stream().map(orderMapper::orderEntityToResponse).collect(Collectors.toList());
    }

    @Override
    public OrderDetail findOrderDetailById(Integer id) {
        return orderDetailRepo.findById(id).orElse(null);
    }

    @Override
    public AppOrder findOrderById(Integer id) {
        return orderRepo.findById(id).orElse(null);
    }

    @Override
    public Double calculateTaxes(List<Tax> taxes, Double totalPrice) {
        Double basePrice = totalPrice;
        for (Tax tax :
                taxes) {
            totalPrice += basePrice * ((tax.getPercentage() / 100));
        }
        return totalPrice;
    }

    private OrderDetailResponse calculateServicePrice(AppService service,
                                                      OrderDetailRequest orderDetailRequest,
                                                      AppOrder order){
        //Mapea el pedido request a una entidad
        OrderDetail orderDetail = orderMapper.orderDetailRequestToEntity
                (orderDetailRequest,
                        order,
                        service,
                        null,
                        service.getPrice());
        orderDetail.setGoodType("Servicio");

        //Calcula el los impuestos sobre el precio base
        Double priceAfterTaxes = calculateTaxes(service.getTaxes(), orderDetail.getTotalPrice());

        //Si es un servicio especial, agrega costos extra
        if(service.getIsSpecial()){
            Double extraCost = orderDetail.getTotalPrice() * (service.getSpecialExtraPercentage()/100);
            orderDetail.setExtraCost(extraCost);
        }
        orderDetail.setFinalItemPrice(priceAfterTaxes + orderDetail.getExtraCost());
        orderDetail.setPriceAfterTaxes(priceAfterTaxes);
        OrderDetail orderDetailEntity = orderDetailRepo.save(orderDetail);
        return orderMapper.orderDetailEntityToResponse(orderDetailEntity);
    }

    private OrderDetailResponse calculateProductPrice(Product product,
                                                      OrderDetailRequest orderDetailRequest,
                                                      AppOrder order){
        //Mapea el pedido request a una entidad
        OrderDetail orderDetail = orderMapper.orderDetailRequestToEntity
                        (orderDetailRequest,
                        order,
                        null,
                        product,
                        product.getPrice());
        orderDetail.setGoodType("Producto");

        //Si tiene garantía, agrega un costo extra del 2% por cada año de garantía
        if(orderDetailRequest.getHasWarranty()){
            Double extraCost = orderDetail.getTotalPrice() * ((double) orderDetailRequest.getWarrantyYears() * (0.02));
            orderDetail.setHasWarranty(true);
            orderDetail.setExtraCost(extraCost);
        }

        //Calcula los impuestos sobre el precio base del producto
        Double priceAfterTaxes = calculateTaxes(product.getTaxes(), orderDetail.getTotalPrice());
        orderDetail.setPriceAfterTaxes(priceAfterTaxes);

        //Si tiene descuento, se lo resta sobre el precio total con impuestos incluidos
        if(order.getHasDiscount()){
            Double priceWithDiscount = priceAfterTaxes - (priceAfterTaxes * (0.1));
            orderDetail.setFinalItemPrice(priceWithDiscount + orderDetail.getExtraCost());
        }else{
            orderDetail.setFinalItemPrice(priceAfterTaxes + orderDetail.getExtraCost());
        }

        OrderDetail orderDetailEntity = orderDetailRepo.save(orderDetail);
        return orderMapper.orderDetailEntityToResponse(orderDetailEntity);
    }

    @Override
    public OrderDetailResponse createOrderDetail(OrderDetailRequest orderDetailRequest) {

        AppOrder order = findOrderById(orderDetailRequest.getOrderId());
        if (order == null || order.getStatus().equals("REALIZADO")) {
            return null;
        }

        //Verifica si el bien solicitado es un servicio y si existe en la base de datos calcula su precio
        Optional<AppService> serviceOpt = goodService.findServiceById(orderDetailRequest.getGoodId());
        if (serviceOpt.isPresent()) {
            AppService service = serviceOpt.get();
            return calculateServicePrice(service, orderDetailRequest, order);
        }

        //Verifica si el bien solicitado es un producto y si existe en la base de datos calcula su precio
        Optional<Product> productOpt = goodService.findProductById(orderDetailRequest.getGoodId());
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            return calculateProductPrice(product, orderDetailRequest, order);
        }
        return null;
    }

    @Override
    public OrderResponse createOrder(OrderRequest request) {

        if (request.getCompanyId() == null) {
            Optional<Person> personOpt = clientService.findPersonById(request.getPersonId());
            if (personOpt.isPresent()) {
                Person person = personOpt.get();
                AppOrder order = orderMapper.orderRequestToEntity(person, null, "Persona");
                order.setHasDiscount(person.getHasActiveService());
                AppOrder orderEntity = orderRepo.save(order);
                return orderMapper.orderEntityToResponse(orderEntity);
            }
            return null;
        }

        Optional<Company> companyOpt = clientService.findCompanyById(request.getCompanyId());
        if (companyOpt.isPresent()) {
            Optional<Person> personOpt = clientService.findPersonById(request.getPersonId());
            if (personOpt.isPresent()) {
                Company company = companyOpt.get();
                Person person = personOpt.get();
                AppOrder order = orderMapper.orderRequestToEntity(person, company, "Empresa");
                order.setHasDiscount(company.getHasActiveService());
                AppOrder orderEntity = orderRepo.save(order);
                return orderMapper.orderEntityToResponse(orderEntity);
            }
        }

        return null;
    }

    @Override
    public OrderResponse updateOrder(OrderUpdateRequest request) {
        OrderDetail orderDetail = findOrderDetailById(request.getOrderDetailId());
        AppOrder order = findOrderById(request.getOrderId());

        if (orderDetail == null || order == null || order.getStatus().equals("REALIZADO")) {
            return null;
        }

        List<OrderDetail> orderDetailList = order.getOrderDetails();
        orderDetailList.add(orderDetail);

        Double totalPrice = order.getTotalPrice() + orderDetail.getTotalPrice();
        Double totalPriceAfterTaxes = order.getTotalPriceAfterTaxes() + orderDetail.getPriceAfterTaxes();
        Double finalPrice = order.getFinalPrice() + orderDetail.getFinalItemPrice();

        order.setTotalPrice(totalPrice);
        order.setTotalPriceAfterTaxes(totalPriceAfterTaxes);
        order.setFinalPrice(finalPrice);

        order.setOrderDetails(orderDetailList);
        return orderMapper.orderEntityToResponse(orderRepo.save(order));
    }

    private void setGoodsToClient(String clientType,
                                  Person person,
                                  Company company,
                                  List<OrderDetail> orderDetailList) {

        List<AppService> services = new ArrayList<>();
        List<Product> products = new ArrayList<>();

        orderDetailList.forEach(orderDetail -> {
            services.add(orderDetail.getService());
            products.add(orderDetail.getProduct());
        });

        if (clientType.equalsIgnoreCase("persona")) {
            person.setServices(services);
            person.setProducts(products);
            if (!person.getServices().isEmpty()) {
                person.setHasActiveService(true);
            }
            clientService.updatePerson(person);
        }
        if (clientType.equalsIgnoreCase("empresa")) {
            company.setServices(services);
            company.setProducts(products);
            if(!company.getServices().isEmpty()){
                company.setHasActiveService(true);
            }
            clientService.updateCompany(company);
        }
    }

    @Override
    public OrderResponse saveOrder(Integer id) {
        AppOrder order = findOrderById(id);
        setGoodsToClient(order.getClientType(), order.getPerson(), order.getCompany(), order.getOrderDetails());
        order.setStatus("REALIZADO");
        return orderMapper.orderEntityToResponse(orderRepo.save(order));
    }
}
