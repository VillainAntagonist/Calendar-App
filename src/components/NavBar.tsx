import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";

const NavBar: FC = () => {
    const router = useHistory()
    const{isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useAction();
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth ?
                    <>
                        <div style={{color: "white", paddingRight: '5px'}}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' selectable={false} style={{width:'90px'}}>
                            <Menu.Item key={1}
                                       onClick={logout}>
                                Logout
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme='dark' mode='horizontal' selectable={false} style={{width:'90px'}}>
                        <Menu.Item key={1}
                                   onClick={() => {router.push(RouteNames.LOGIN)}}>
                            Login
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default NavBar;
