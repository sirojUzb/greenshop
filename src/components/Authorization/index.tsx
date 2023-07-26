import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthModalVisibility } from "../../redux/modalSlice";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Authorization = () => {
  const [active, setActive] = useState<string>("login");
  const dispatch = useReduxDispatch();
  const { authModalVisbility } = useReduxSelector((state) => state.modal);

  return (
    <Modal
      open={authModalVisbility.open}
      onCancel={() =>
        dispatch(
          setAuthModalVisibility({
            open: authModalVisbility.loading,
            loading: authModalVisbility.loading,
          }),
        )
      }
      footer={false}
    >
      <div className="flex gap-2.5 items-center justify-center mt-6">
        <h3
          tabIndex={0}
          onKeyUp={() => !authModalVisbility.loading && setActive("login")}
          onClick={() => !authModalVisbility.loading && setActive("login")}
          className={`cursor-pointer text-xl transition-all ${
            active === "login" && "text-[#46A358]"
          } ${
            !(authModalVisbility.loading && active !== "login") || "opacity-20"
          }`}
        >
          Login
        </h3>
        <div className="border h-4 bg-[#3D3D3D]"></div>
        <h3
          tabIndex={0}
          onKeyUp={() => !authModalVisbility.loading && setActive("register")}
          onClick={() => !authModalVisbility.loading && setActive("register")}
          className={`cursor-pointer text-xl transition-all ${
            active === "register" && "text-[#46A358]"
          } ${
            !(authModalVisbility.loading && active !== "register") ||
            "opacity-20"
          } `}
        >
          Register
        </h3>
      </div>
      {active === "login" ? <Login /> : <Register />}
    </Modal>
  );
};

export default Authorization;
