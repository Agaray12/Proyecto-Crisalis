import * as React from "react"

export default function SvgComponent (props) {
  return(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 110"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#FDFDFE"
      d="M486 111H1V1h512v110h-27M171.857 55.488v14.667c-7.406-9.043-14.18-16.817-20.343-25.048-3.08-4.111-6.455-5.098-11.103-3.886V81.51h7.852V52.935c6.991 8.575 13.615 16.27 19.712 24.362 2.986 3.963 6.24 5.563 11.014 4.265V40.978h-7.11c0 4.614 0 9.065-.022 14.51m208.177 10.01v16.087h8.018V52.922c7.104 8.7 13.66 16.423 19.843 24.434 2.93 3.795 6.02 5.874 10.89 4.09v-40.42h-7.264v28.958c-7.223-8.82-13.988-16.579-20.133-24.8-3.049-4.08-6.39-5.24-11.354-3.965v24.279M222.85 47.539v22.666c-7.422-9.05-14.229-16.803-20.36-25.057-3.08-4.148-6.424-5.13-11.092-3.926V81.52h7.817V52.94c7.083 8.668 13.837 16.466 20.014 24.697 2.93 3.904 6.09 5.125 10.716 3.88V41.006h-7.095v6.533m26.751 34.373h25.36V75.48h-24.689V63.94h21.755l-.374-6.119h-21.409V46.924h23.82V41.08h-31.627v40.83h7.164m85.441-17.452-8.07 16.936.643 1.233c2.665-.902 7.182-1.228 7.675-2.808 2.186-7.009 6.833-7.9 12.97-7.214 3.121.35 6.326.238 9.47.009 2.874-.21 4.833.557 5.532 3.524 1.368 5.813 5.175 6.89 10.699 5.234-6.184-12.861-12.244-25.722-18.656-38.403-.647-1.28-3.435-2.034-5.218-2.012-1.57.019-3.87 1.063-4.56 2.347-3.605 6.708-6.8 13.637-10.485 21.154m117.31 16.685c7.102-2.593 9.776-5.592 9.796-10.984.02-5.333-2.924-8.658-9.845-10.947-2.998-.991-6.314-1.35-8.997-2.863-2.14-1.207-3.54-3.728-5.267-5.666 2.328-1.219 4.708-3.533 6.972-3.425 4.522.216 8.98 1.761 13.814 2.836l2.777-5.436c-8.723-4.397-17.246-5.889-26.13-1.892-4.005 1.802-6.157 5.092-6.073 9.51.08 4.252 2.407 7.232 6.237 8.854 2.742 1.161 5.65 1.928 8.478 2.885 2.196.743 4.644 1.127 6.493 2.385 1.433.976 3.05 3.177 2.867 4.614-.187 1.459-2.396 3.635-3.869 3.762-3.71.32-7.61.104-11.234-.745-2.923-.684-5.555-2.606-8.562-4.102l-3.016 5.715c7.676 5.572 15.725 7.742 25.559 5.499M321.91 70.398v-8.442h-6.755c0 1.478.002 2.64 0 3.802-.014 8.114-2.481 10.39-10.959 10.11-8.836-.292-15.975-7-15.772-14.82.207-7.928 7.424-14.563 16.3-14.045 4.45.259 8.806 2.149 13.948 3.496l3.475-4.114c-7.288-5.4-15.154-6.772-23.477-5.163-10.656 2.06-17.815 10.18-17.933 19.767-.121 9.899 6.408 17.59 17.198 20.346 6.393 1.633 12.465.529 18.553-1.642 4.143-1.477 6.52-3.699 5.422-9.295M83.863 72.463v9.06h7.71V64.906h20.173v-6.115H91.795V46.8h22.044v-5.617H83.863v31.28m44.6-11.963V41.06h-7.564c0 12.843-.003 25.454.006 38.064 0 .79.09 1.581.146 2.507h7.411V60.5m-84.364-3.949c.914-.39 1.904-.66 2.73-1.188 3.516-2.245 4.264-5.626 2.699-9.137-1.607-3.607-4.876-5.082-8.72-3.834-3.825 1.241-5.49 4.218-4.86 8.203.654 4.134 3.63 5.665 8.15 5.956m-5.585 22.36c5.547 2.85 10.696.96 11.54-4.313.556-3.477-.666-6.245-3.913-7.81-3.223-1.556-6.258-.97-8.53 1.746-2.73 3.263-2.45 6.662.903 10.378m22.446 10.226c2.037-5.402.855-9.285-3.42-10.714-3.536-1.182-6.692-.455-8.625 2.917-1.952 3.405-1.726 6.902 1.451 9.423 3.5 2.776 7.07 2.354 10.594-1.626M30.632 53.986c-5.453 1.673-7.753 4.918-6.544 9.23 1.097 3.916 4.955 6.082 8.952 4.95 3.485-.988 5.276-3.463 5.153-6.979-.149-4.213-2.565-6.632-7.561-7.201m31.153-14.152c1.882-4.812-1.936-7.12-4.774-9.163-1.297-.934-5.07-.343-6.24.924-1.664 1.8-2.945 5.028-2.552 7.333.352 2.065 2.87 4.46 5.003 5.364 3.525 1.494 6.301-.683 8.563-4.458M50.668 67.111c3.57 1.608 7.492 2.36 9.672-1.461 1.231-2.159 1.382-5.84.4-8.149-1.598-3.764-6.166-4.54-9.276-2.484-4.226 2.792-4.658 6.327-.796 12.094z"
    />
    <path
      fill="#070707"
      d="M171.868 54.992c.012-4.949.012-9.4.012-14.014h7.11v40.584c-4.776 1.298-8.029-.302-11.015-4.265-6.097-8.092-12.72-15.787-19.712-24.362V81.51h-7.852V41.22c4.648-1.212 8.024-.225 11.103 3.886 6.163 8.23 12.937 16.005 20.343 25.048 0-5.664 0-10.165.011-15.163zM380.034 64.998V41.22c4.964-1.275 8.305-.115 11.354 3.964 6.145 8.222 12.91 15.98 20.133 24.801V41.025h7.265v40.42c-4.87 1.785-7.962-.294-10.89-4.09-6.184-8.01-12.74-15.733-19.844-24.433v28.663h-8.018V64.998zM222.851 47.045v-6.04h7.095v40.512c-4.627 1.245-7.785.024-10.716-3.88-6.177-8.23-12.93-16.03-20.014-24.698v28.58h-7.817V41.223c4.668-1.204 8.011-.222 11.092 3.926 6.131 8.254 12.938 16.006 20.36 25.057v-23.16z"
    />
    <path
      fill="#090909"
      d="M249.118 81.912h-6.68v-40.83h31.626v5.842h-23.819V57.82h21.41l.373 6.119h-21.755V75.48h24.69v6.432h-25.845z"
    />
    <path
      fill="#0D0D0D"
      d="M335.217 64.127c3.512-7.185 6.706-14.114 10.311-20.822.69-1.284 2.99-2.328 4.56-2.347 1.783-.022 4.571.733 5.218 2.012 6.412 12.681 12.472 25.542 18.656 38.403-5.524 1.656-9.33.58-10.7-5.234-.698-2.967-2.657-3.734-5.531-3.524-3.144.23-6.349.34-9.47-.009-6.137-.686-10.784.205-12.97 7.214-.493 1.58-5.01 1.906-7.675 2.808l-.643-1.233c2.69-5.645 5.38-11.29 8.244-17.268m11.583 2.226H358.7l-8.391-18.006c-1.692 3.596-3.026 6.404-4.335 9.223-1.29 2.783-2.556 5.578-3.944 8.613 1.574.069 2.721.12 4.771.17z"
    />
    <path
      fill="#090909"
      d="M451.948 81.237c-9.429 2.15-17.478-.02-25.154-5.592l3.016-5.715c3.007 1.496 5.64 3.418 8.562 4.102 3.625.85 7.523 1.064 11.234.745 1.473-.127 3.682-2.303 3.869-3.762.184-1.437-1.434-3.638-2.867-4.614-1.849-1.258-4.297-1.642-6.493-2.385-2.829-.957-5.736-1.724-8.478-2.885-3.83-1.622-6.157-4.602-6.237-8.854-.084-4.418 2.068-7.708 6.073-9.51 8.884-3.997 17.407-2.505 26.13 1.892l-2.777 5.436c-4.835-1.075-9.292-2.62-13.814-2.836-2.264-.108-4.644 2.206-6.972 3.425 1.728 1.938 3.127 4.459 5.267 5.666 2.683 1.513 5.999 1.872 8.997 2.863 6.921 2.289 9.865 5.614 9.845 10.947-.02 5.392-2.694 8.391-10.2 11.077zM321.91 70.857c1.098 5.137-1.279 7.359-5.422 8.836-6.088 2.171-12.16 3.275-18.553 1.642-10.79-2.756-17.32-10.447-17.198-20.346.118-9.586 7.277-17.707 17.933-19.767 8.323-1.609 16.189-.236 23.477 5.163l-3.475 4.114c-5.142-1.347-9.497-3.237-13.948-3.496-8.876-.518-16.093 6.117-16.3 14.044-.203 7.82 6.936 14.53 15.772 14.82 8.478.28 10.945-1.995 10.96-10.11v-3.801h6.754v8.901z"
    />
    <path
      fill="#030303"
      d="M83.863 71.969V41.183h29.976V46.8H91.795v11.992h19.95v6.115H91.573v16.615h-7.71V71.97z"
    />
    <path
      fill="#010101"
      d="M128.462 61v20.63h-7.41c-.057-.926-.146-1.716-.147-2.507-.009-12.61-.006-25.221-.006-38.064h7.563V61z"
    />
    <path
      fill="#2B9FFF"
      d="M43.734 56.62c-4.156-.36-7.133-1.891-7.787-6.025-.63-3.985 1.035-6.962 4.86-8.203 3.844-1.248 7.113.227 8.72 3.834 1.565 3.511.817 6.892-2.699 9.137-.826.527-1.816.799-3.094 1.258z"
    />
    <path
      fill="#299EFF"
      d="M38.23 78.652c-3.07-3.456-3.351-6.855-.62-10.118 2.27-2.715 5.306-3.302 8.53-1.747 3.246 1.566 4.468 4.334 3.912 7.811-.844 5.272-5.993 7.163-11.823 4.054z"
    />
    <path
      fill="#56B1FF"
      d="M60.747 89.463c-3.314 3.655-6.884 4.077-10.383 1.3-3.177-2.52-3.403-6.017-1.451-9.422 1.933-3.372 5.089-4.099 8.624-2.917 4.276 1.429 5.458 5.312 3.21 11.039z"
    />
    <path
      fill="#0679E2"
      d="M31.028 53.983c4.6.572 7.016 2.99 7.165 7.204.123 3.516-1.668 5.991-5.153 6.978-3.997 1.133-7.855-1.033-8.952-4.949-1.209-4.312 1.091-7.557 6.94-9.233z"
    />
    <path
      fill="#58B2FF"
      d="M61.637 40.201c-2.114 3.408-4.89 5.585-8.415 4.091-2.133-.904-4.651-3.299-5.003-5.364-.393-2.305.888-5.533 2.551-7.333 1.17-1.267 4.944-1.858 6.241-.924 2.838 2.042 6.656 4.351 4.626 9.53z"
    />
    <path
      fill="#80C4FD"
      d="M50.36 66.844c-3.554-5.5-3.122-9.035 1.104-11.827 3.11-2.055 7.678-1.28 9.277 2.484.98 2.308.83 5.99-.401 8.149-2.18 3.821-6.101 3.07-9.98 1.194z"
    />
    <path
      fill="#F8F8F8"
      d="M346.349 66.353c-1.599-.05-2.746-.101-4.32-.17 1.388-3.035 2.653-5.83 3.944-8.613 1.309-2.82 2.643-5.627 4.335-9.223l8.39 18.006h-12.35z"
    />
  </svg>
)
}