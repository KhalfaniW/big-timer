export function playRemoteSound(url) {
    var audio = document.createElement("audio");
    audio.style.display = "none";
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function () {
        audio.remove();
    };
    document.body.appendChild(audio);
}
