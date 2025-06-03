document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const barcodeInput = document.getElementById('barcodeInput');
    const scanButton = document.getElementById('scanButton');

    let stream;

    scanButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(s => {
                stream = s;
                video.srcObject = stream;
                video.play();
                startScanning();
            })
            .catch(err => console.error('Camera access error:', err));
    });

    function startScanning() {
        const codeReader = new ZXing.BrowserMultiFormatReader();
        codeReader.decodeFromVideoDevice(null, 'video', (res, err) => {
            if (res) {
                console.log('Barcode result:', res.getText());
                barcodeInput.value = res.getText();
                stopScanning();
            }
        });
    }

    function stopScanning() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
});
