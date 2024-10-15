import { useEffect, useState } from "react";
import { showCustomers } from "../../../../functions/functions";

export const ControllerMoreDetails = ({ id, category }) => {
    const [peopleInfo, setPeopleInfo] = useState([]);
    const [filterData, setFilterData] = useState([]);
    
    const urlUpdateData = category === "employee"
        ? `../add-employed/${id}?action=update`
        : (category === "customer")
            ? `../add-customer/${id}/update`
            : (category === "vehicle" ? `../add-vehicle/${id}/update` : "");

    useEffect(() => {
        const fetchCustomers = async () => {

            const urlApi = category === "customer"
                ? "/api/v1/customers/all"
                : (category === "employee"
                    ? "/api/v1/companie/users"
                    : (category === "crew"
                        ? "/api/v1/employeefluvial/all"
                        : (category === "vehicle"
                            ? "/api/v1/vehicles/all"
                            : "")));

            await showCustomers(setPeopleInfo, urlApi);
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const parsedId = parseInt(id, 10);
        const data = peopleInfo.find((item) => item.id === parsedId);

        setFilterData(data ? [data] : []);
    }, [peopleInfo, id]);

    return { filterData, urlUpdateData };
};
