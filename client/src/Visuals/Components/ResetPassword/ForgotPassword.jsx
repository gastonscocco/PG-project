import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../Controllers/actions/userActions";
import { sendMail } from "../../../ApiReq/mails";
import { updateUserPass } from "../../../ApiReq/users";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import ComponentHeader from "../ComponentHeader";
import passwordGenerator from "./passwordGenerator";
import Swal from "sweetalert2";

function ForgotPassword() {
  const dispatch = useDispatch();
  const usernames = useSelector((state) => state.userReducer.users);

  const [inputs, setInputs] = useState({
    mail1: "",
    mail2: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!usernames.length) {
      dispatch(getAllUsers());
    }
  }, [usernames]);

  function changeInput(e) {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
    let test = Object.values({ ...inputs, [e.target.name]: e.target.value });
    setError(test[0] !== test[1]);
  }

  function submit(e) {
    e.preventDefault();
    if (inputs.mail1 && inputs.mail2 && !error) {
      let username = usernames.find((u) => u.email === inputs.mail1).username;
      let password = passwordGenerator()
    //   let password = "123456789";
      updateUserPass(username, { password })
        .then((r) =>
          r._id ? sendMail("resetPass", { password, email: r.email }) : null
        )
        .then((r) =>
          Swal.fire({
            icon: "success",
            title:
              "Si tu correo está en nuestro sistema, te llegarán las instrucciones allí",
            timer: 3000,
          })
        );
    }
  }

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <ComponentHeader
        data={{
          title: "Resetea tu contraseña",
          subtitle: "Sigue los pases descritos para recuperar tu cuenta",
          bg: "https://images.pexels.com/photos/776615/pexels-photo-776615.jpeg?auto=compress&cs=tinysrgb&dpr=2&&w=1920",
        }}
      />
      <div className="w-3/5 h-96 md:w-2/5 my-4 flex flex-col items-center">
        <p className="text-justify font-lg mb-4">
          Ingresa tu correo electrónico para confirmar tu identidad, te
          enviaremos los pasos a seguir a esa dirección
        </p>
        <form className="w-4/5 flex flex-col h-full justify-evenly">
          <div>
            <label>Ingresa tu correo electrónico</label>
            <div className="my-4">
              <Input
                type="text"
                color="red"
                size="Regular"
                outline={true}
                placeholder="Correo electrónico"
                value={inputs.mail1}
                name="mail1"
                onChange={changeInput}
              />
            </div>
          </div>
          <div>
            <label>Confirma tu correo electrónico</label>
            <div className="my-4">
              <Input
                type="text"
                color="red"
                size="Regular"
                outline={true}
                placeholder="Confirmación de correo"
                error={error ? "Los correos no coinciden" : ""}
                value={inputs.mail2}
                name="mail2"
                onChange={changeInput}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              color="red"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={submit}
            >
              Resetear contraseña
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
