import { Components } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterProduct.css'

const RegisterProduct = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const [nameInvalid, setNameInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);
    const [priceInvalid, setPriceInvalid] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name cannot be blank.";
        if (!description.trim()) newErrors.description = "Description cannot be blank.";
        if (price < 0 || price === "") newErrors.price = "Price cannot be negative or empty.";
        return newErrors;
      };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        validateForm();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setName("");
            setDescription("");
            setPrice(0);
        }
    }

    const navigateToProducts = () => {
        navigate("/products")
    }

    return (
        <div className='RegisterProduct'>
            <form onSubmit={handleSubmit}>
            <h1>Enter Product Details: </h1>
            <label>Name: </label>
            <input name="name" type="text" value={name}
                    onChange={event => setName(event.target.value)}></input>
{errors.name && <div className="error">{errors.name}</div>}            <p></p>
            <label>Description: </label> 
            <input name="description" type="text" value={description}
                onChange={event => setDescription(event.target.value)}></input>
          {errors.description && <div className="error">{errors.description}</div>}
          <p />
            <label>Price: </label>
            <input name="price" type="value" value={price}
                onChange={ event=>setPrice(event.target.value)}></input>
                {errors.price && <div className="error">{errors.price}</div>}

                <p />
            <button type="submit">Submit</button>
        </form>
            <button type="button" onClick={ navigateToProducts}>Take me to product cards</button>
        </div>
        
    )
}

export default RegisterProduct;