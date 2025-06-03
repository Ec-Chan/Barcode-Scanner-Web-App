document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const result = document.getElementById('result');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => console.error('Camera access error:', err));

    const codeReader = new ZXing.BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(null, 'video', (res, err) => {
        if (res) {
            console.log('Barcode result:', res.getText());
            result.textContent = `Barcode result: ${res.getText()}`;
        }
    });
});
