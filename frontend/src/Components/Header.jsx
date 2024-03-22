import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="lg" bg='primary' variant='dark' collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            {userInfo ? (
              <>
                <LinkContainer to={'/post-product'}>
                  <Nav.Link>
                    Post Product
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>
                      <i className="fas fa-user"></i>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to={'/login'}>
                <Nav.Link>
                  Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
