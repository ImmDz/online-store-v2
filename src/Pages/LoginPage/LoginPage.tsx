import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Content } from "antd/es/layout/layout";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { userActions, getIsAuthValue, getUserLoadStatus } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getIsAuthValue);
    const navigate = useNavigate();
    const loadStatus = useSelector(getUserLoadStatus);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (loadStatus === "ERROR") {
            message.open({ type: "warning", content: "Неверный пользователь" });
        }
        if (isAuth) {
            message.open({ type: "success", content: "Успешный вход" });
            navigate("/");
        }
    }, [loadStatus])
    return (
        <Content>
            <Form>
                <Form.Item
                    label="Логин"
                    name="логин"
                    rules={[{ required: true, message: 'обязательное поле!' }]}
                >
                    <Input onChange={(e) => setLogin(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="пароль"
                    rules={[{ required: true, message: 'обязательное поле!' }]}
                >
                    <Input onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => {
                        if (!login.trim() || !password.trim()) {
                            message.open({ type: 'warning', content: "Оба поля должны быть заполнены!" });
                        } else {
                            dispatch(userActions.serverRequest({ login: login, password: password }));
                        }
                    }} type="primary" htmlType="submit">Войти</Button>
                    <Link to="/registration"><Button>Зарегистрироваться</Button></Link>
                </Form.Item>
            </Form>
        </Content>
    )
}