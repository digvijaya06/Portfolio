document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".education-box");

    function revealBoxes() {
        const triggerBottom = window.innerHeight * 0.85; // 85% of viewport height

        boxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                box.classList.add("show");
            }
        });
    }

    // Run when page is scrolled
    window.addEventListener("scroll", revealBoxes);
    
    // Run on page load (in case elements are already in viewport)
    revealBoxes();
});
