import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { Button, Col, Collapse, Container, Row, Spinner } from "react-bootstrap";
import { BsBag } from "react-icons/bs";
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AddReview } from '../../components/user/AddReview';
import { axiosInstance } from "../../config/axiosInstance";

function ProductDetailsPage() {
    const { darkMode } = useSelector((state) => state.mode);
    const { productId } = useParams();
    const [product, error] = useFetch(`/product/get-product/${productId}`);
    const [selectedSize, setSelectedSize] = useState('');
    const [openDescription, setOpenDescription] = useState(false);
    const [openMaterials, setOpenMaterials] = useState(false);
    const [openCareGuide, setOpenCareGuide] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [product]);

    const sizesByCategory = {
        'accessories': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Ladies': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Preppy luxe': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'New neutrals': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Modern romance': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Activewear-by-Move': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Hot-sellers': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'New-utilitarian': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Denim': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Transitional-fits': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Kids': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Kids9-14y': ['8-9Y', '9-10Y', '10-11Y', '11-12Y', '12-13Y', '13-14Y', '14+'],
        'Baby': ['4-6M', '6-9M', '9-12M', '11-12M', '12-18M', '1-2Y', '2-3Y', '3-4Y'],
        'Kids2-8y': ['1-2Y', '2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y', '9-10Y']
    };

    const category = product?.category;
    const sizes = sizesByCategory[category] || [];

    const handleAddToCart = async () => {
        try {
            if (!selectedSize) {
                toast.error("Please select a size before adding to cart.");
                return;
            }

            if (product?.stock <= 0) {
                toast.error(`Insufficient stock for ${product.title.trim()}`);
                return;
            }

            await axiosInstance.post("/cart/add-to-cart", { productId, size: selectedSize });
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                toast.error('You have to log in to add items to your shopping bag.');
                navigate('/login');
            } else {
                toast.error(error?.response?.data?.message || 'Failed to update wishlist');
            }
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <Container className="my-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
                </div>
            ) : product ? (
                <Row className="d-flex justify-content-center align-items-start">
                    <Col xs="12" md="6" className="mb-4 mb-md-0">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    </Col>
                    <Col xs="12" md="6" className="text-center text-md-start">
                        <h1 className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                            {product?.title}
                        </h1>
                        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                            Available: {product?.stock}
                            {product?.stock <= 0 && (
                                <span style={{ color: "red", marginLeft: "8px", fontWeight: "500" }}>
                                    Insufficient stock
                                </span>
                            )}
                        </p>
                        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                            Rs. {product?.price}.00
                        </p>

                        <div className="size-selection">
                            <p className={darkMode ? "text-black" : "text-white"}>Sizes</p>
                            <div className="size-sec">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size text-center ${selectedSize === size ? "selected" : ""}`}
                                        style={{
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            border: "1px solid white",
                                            padding: '7px',
                                        }}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <br />
                            <p className={darkMode ? "text-black" : "text-white"}>
                                Delivery Time: 2-7 days
                            </p>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-3 add-to-cart border-white"
                            style={{ border: "1px solid white" }}
                        >
                            <BsBag style={{ marginRight: "8px" }} />
                            Add
                        </button>
                        <Button
                            variant="link"
                            className={`${darkMode ? "text-black" : "text-white"} description-btn d-flex w-100 align-items-center`}
                            onClick={() => setOpenDescription(!openDescription)}
                            aria-controls="description-collapse-text"
                            aria-expanded={openDescription}
                            style={{ marginTop: "1rem", fontWeight: "700" }}
                        >
                            <span className={openDescription ? "text-danger" : "description-btn"}>
                                DESCRIPTION & FIT
                            </span>
                            <span className="ms-auto">
                                {openDescription ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
                            </span>
                        </Button>
                        <Collapse in={openDescription}>
                            <div id="description-collapse-text" className="mt-3">
                                <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "1rem", fontWeight: "400" }}>
                                    {product?.description}
                                </p>
                            </div>
                        </Collapse>
                        <hr />
                        <Button
                            variant="link"
                            className={`${darkMode ? "text-black" : "text-white"} materials-btn d-flex w-100 align-items-center`}
                            onClick={() => setOpenMaterials(!openMaterials)}
                            aria-controls="materials-collapse-text"
                            aria-expanded={openMaterials}
                            style={{ marginTop: "1rem", fontWeight: "700" }}
                        >
                            <span className={openMaterials ? "text-danger" : "materials-btn"}>
                                MATERIALS
                            </span>
                            <span className="ms-auto">
                                {openMaterials ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
                            </span>
                        </Button>
                        <Collapse in={openMaterials}>
                            <div id="materials-collapse-text" className="mt-3">
                                <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "1rem", fontWeight: "400" }}>
                                    {product?.materials}
                                </p>
                            </div>
                        </Collapse>
                        <hr />
                        <Button
                            variant="link"
                            className={`${darkMode ? "text-black" : "text-white"} care-guid-btn d-flex w-100 align-items-center`}
                            onClick={() => setOpenCareGuide(!openCareGuide)}
                            aria-controls="careguide-collapse-text"
                            aria-expanded={openCareGuide}
                            style={{ marginTop: "1rem" }}
                        >
                            <span className={openCareGuide ? "text-danger" : "care-guid-btn"}>
                                CARE GUIDE
                            </span>
                            <span className="ms-auto">
                                {openCareGuide ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
                            </span>
                        </Button>
                        <Collapse in={openCareGuide}>
                            <div id="careguide-collapse-text" className="mt-3">
                                <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "1rem", fontWeight: "400" }}>
                                    {product?.careguid}
                                </p>
                            </div>
                        </Collapse>
                        <AddReview />
                    </Col>
                </Row>
            ) : (
                <p className="text-center" style={{fontWeight:"600"}}>No product found!</p>
            )}
        </Container>
    );
}

export default ProductDetailsPage;
