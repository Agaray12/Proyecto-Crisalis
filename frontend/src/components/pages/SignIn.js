import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Finnegans from "../icons/Finnegans";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useLocalState } from "../../util/useLocalStorage";

export default function SignIn() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  const submitForm = async () => {


    const reqBody = {
      username: username,
      password: password,
    };

    await axios
      .post("api/auth/login", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if(response.status === 200){
          setJwt(response.data.accessToken);
          navigate("/");
        }
        else
          return Promise.reject("Invalid login attempt");
        })
        .catch((message) => {
        alert(message);
      });
  };

  return (
    <div className="vh-100">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://media.istockphoto.com/id/1333211562/vector/cyber-network-protection-future-technology-background.jpg?b=1&s=612x612&w=0&k=20&c=vO4ikHNDSBCsjJT7bskcDGA6hnvfAg0V6tsrQmRap0w="
              alt="login form"
              className="rounded-start w-100 vh-100"
            />
          </MDBCol>

          <MDBCol md="6" className="d-flex align-items-center px-5">
            <MDBCardBody className="d-flex flex-column mx-5 px-5">
              <div className="d-flex flex-row justify-content-center">
                <Finnegans height={75} className="" />
              </div>

              <h5
                className="fw-bolder my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
              <MDBInput
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                wrapperClass="mb-4"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={() => submitForm()}
              >
                Login
              </MDBBtn>

              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  Register here
                </a>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}
