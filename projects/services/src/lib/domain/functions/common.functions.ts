// import moment from 'moment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
export function isNullOrUndefined(arg: any) {
    return arg === null || arg === undefined || arg === '';
}
export function existClassForId(id: any, name: any) {
    var input = document.getElementById(id) as any;
    if (input.classList.contains(name)) {
        return true;
    } else {
        return false;
    }
}
export function alertsMessage(icon: SweetAlertIcon, titile: string, description: string) {
    Swal.fire({
        icon: icon,
        title: titile,
        text: description,
    });
}
export function removedScrollDialog() {
    var element = document.getElementsByClassName("p-dialog-content") as any;
    element[0].style.overflow = 'hidden';
}
export function downloadPdf(base64String: string, fileName: string) {
    // Decodificar la cadena base64
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Simular clic para descargar el archivo
    link.click();

    // Liberar memoria
    window.URL.revokeObjectURL(link.href);
}
export function downloadXML(base64String: string, fileName: string) {
    // Decodificar la cadena base64
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/xml' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Simular clic para descargar el archivo
    link.click();

    // Liberar memoria
    window.URL.revokeObjectURL(link.href);
}
// export function formatDateNow(codeDay?: number, isAddDay: boolean = false) {
//   return new Promise<moment.Moment>((response) => {
//     var currentDateTime = moment();
//     var currentDate = moment({
//       year: currentDateTime.year(),
//       month: currentDateTime.month(),
//       day: currentDateTime.date()

//     });
//     if (isAddDay) {
//       currentDate.add(codeDay, 'days')
//     }
//     response(currentDate);
//   });
// }
