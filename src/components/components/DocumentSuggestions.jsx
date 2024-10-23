import { useEffect, useState } from "react";
import { ApiService } from "../../class/ApiServices";
import '../../assets/css/suggestions/stylesOptionsSuggestions.css'
import { clearError } from "../../functions/functions";

export const DocumentSuggestions = ({ numDocumentToSearch, setFormData, setErrorsForms }) => {
    const [listNumDocuments, setListNumDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const handleChangelistState = async () => {
        try {
            const urlApi = "/api/v1/customers/all";
            const response = await ApiService.get(urlApi);

            if (response) {
                const formattedData = response.map(item => ({
                    name: `${item.name} ${item.lastName}`,
                    numDocument: item.numDocument
                }));

                setListNumDocuments(formattedData);
                setFilteredDocuments(formattedData);
            }
        } catch (error) {
            console.error("Error al obtener documentos:", error);
        }
    };

    useEffect(() => {
        handleChangelistState();
    }, []);

    useEffect(() => {
        // Filtrar los documentos según el número de documento a buscar
        const elementsFilter = listNumDocuments.filter(element =>
            element.numDocument.includes(numDocumentToSearch)
        );

        setFilteredDocuments(elementsFilter);
    }, [listNumDocuments, numDocumentToSearch]);

    const handleChangeSearch = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            customerNumDocument: value,
            customerFlag: true
        }));
        clearError(setErrorsForms, "customerNumDocument");
    };

    return (
        <div className="">
            {filteredDocuments.map((option, index) => (
                <button
                    className="custom-button2"
                    key={index}
                    onClick={handleChangeSearch}
                    value={option.numDocument}>
                    {option.numDocument} ({option.name} )
                </button>
            ))}

        </div >
    );
};
