import { useEffect, useState } from "react";
import { showCustomers } from "../../../../functions/functions";

export const ControllerMoreDetails = ({ id }) => {
    const [customerInfo, setCustomerInfo] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            await showCustomers(setCustomerInfo);
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const parsedId = parseInt(id, 10);
        const data = customerInfo.find((item) => item.id === parsedId);
        console.log("Elemento filtrado:", data);

        setFilterData(data ? [data] : []);
    }, [customerInfo, id]);

    return { filterData };
};
