import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound(props: {
    city: string
}) {
    const navigate = useNavigate();
    return (
        <div className="dialog">
            <div className="container">
                <h2>Location Not Found</h2>
                <div className="white-line"></div>
                <h3>Cannot find a city named {props.city}!
                    Navigate to home page.</h3>
                <Button onClick={() => {
                    navigate('/');
                }}>OK</Button>
            </div>
        </div>
    )
}