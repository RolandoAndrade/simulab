export function readFile(file: File, callback: (result: any) => void) {
    const reader = new FileReader();

    reader.onload = function() {
        callback(reader.result);
    }

    reader.readAsArrayBuffer(file);
}