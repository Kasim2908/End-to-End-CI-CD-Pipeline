document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 CI/CD Dashboard loaded successfully");

    /*
     * Deployment simulation
     */

    window.deploy = function () {

        const status = document.getElementById("status");

        if (!status) {
            return;
        }

        status.textContent = "⏳ Deployment in progress...";

        status.className = "status pending";

        setTimeout(() => {

            status.textContent = "✅ Deployment Successful!";

            status.className = "status success";

        }, 2000);
    };


    /*
     * Add a small entrance animation
     * to pipeline cards and steps.
     */

    const animatedElements = document.querySelectorAll(
        ".pipeline-card, .status-card, .step, .technology-card"
    );

    animatedElements.forEach((element, index) => {

        element.style.opacity = "0";

        element.style.transform = "translateY(20px)";

        element.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }, index * 100);

    });

});
