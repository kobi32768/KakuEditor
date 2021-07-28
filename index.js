// ここはrenderer

const btn = document.getElementById("loadfile");
btn.addEventListener("click", async () => {
    const resultJson = await window.textApi.loadFile();
    const result = resultJson["text"];
    document.getElementById("article").innerText = result;
});
