
export const ControllerCreateUpdate = () => {

    const [formData, setformData] = useState({
        productName: "",
        description: "",
        weight: 0,
        unitOfMeasurement: "",
        height: 0,
        length: 0,
        width: 0,
        dimensions: "",
        packagingType: "",
        isPerishable: false,
        insured: false,
        specialHandlingInstructions: "",
        hazardousMaterials: false,
        category: {
            categoryId: null,
            categoryName: ""
        },
        vehicleName: "",
        companyName: "",
        customerNumDocument: "",
        warehouseName: ""
    });

    // EXPORTAR
    const handleChange = (event) => {
        const { name, value } = event.target;

        setformData(prevState => ({
            ...prevState, [name]: value
        }));
    }

    return {}
}
