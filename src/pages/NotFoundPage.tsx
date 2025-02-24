import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound(props: {
    city: string
}) {
    const navigate = useNavigate();
    return (
        <div className="dialog">
            <div className="container py-2 px-5">
                <p className="fw-bold fs-2 mb-0">Location Not Found</p>
                <hr />
                <p className="fs-5 mb-0">A city named {props.city} not found!</p>
                <p className="fs-6">Click 'OK' to navigate back to the home page.</p>
                <div className="text-end">
                    <Button className="" onClick={() => {
                        navigate('/');
                    }}>OK</Button>
                </div>
            </div>
        </div>
    )
}