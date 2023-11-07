import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {login, register} from "../../../services/auth.service";
import IUser from "../../../types/user.type";
import lights_on from "../../../assets/images/lights_on.png";
import {NavigateFunction, useNavigate} from "react-router-dom";

export default function RegistrationForm() {
    const navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: IUser = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue: IUser) => {
        const {username, email, password} = formValue;

        register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                sessionStorage.setItem("usrnm", username);
                sessionStorage.setItem("pwrd", password);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );

    };

    function handleLogin() {


        login(sessionStorage.getItem("usrnm"), sessionStorage.getItem("pwrd"))
            .then(
                () => {
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                }
            );
    }

    return (
        <div className="col-start-3 col-span-1 box-shadow">
            <div className="grid grid-cols-5 gap-3 p-5 ">
                <img
                    src={lights_on}
                    height={180}
                    width={330}
                    alt="red-lights"
                    className="login-pic"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form className={"col-start-1 col-span-3"}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <Field name="username" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"> Email </label>
                                    <Field name="email" type="email" className="form-control"/>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-proceed">
                                        <span>Sign Up</span></button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}

                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
            <div>
                {successful ?
                    <div>
                        <div className="form-group">
                            <button type="button" className="btn btn-proceed" onClick={handleLogin}>
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                    : <div>
                    </div>}
            </div>
        </div>
    );
}