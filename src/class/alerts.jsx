import Swal from "sweetalert";

export class Alert {
    static alertConfirm(titleAlert, textAlert, textResponse, navigate, destination) {
        return new Promise((resolve) => {
            Swal({
                title: titleAlert,
                text: textAlert,
                icon: 'warning',
                buttons: ["No", "Sí"]
            }).then((isConfirmed) => {
                if (isConfirmed) {
                    Swal({
                        text: textResponse,
                        icon: 'success',
                        timer: 2000
                    }).then(() => {
                        navigate(destination);
                    });
                }
                resolve(isConfirmed);
            });
        });
    }
}