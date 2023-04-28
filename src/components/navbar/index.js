import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";

function NavbarItem( {user} ) {
  return (
    <Navbar className="bg-white h-screen">
      <Container>
        <Navbar.Collapse className="justify-content-end">
          <Badge badgeContent={4} color="primary" className="me-4">
            <MailIcon color="action" />
          </Badge>
          <Navbar.Text>
            <p className="m-auto">Hello, {user}</p>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItem;
