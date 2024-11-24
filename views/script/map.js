function drawCircle(findNum) {
  const elements = document.querySelectorAll("#_번호 > text > tspan");
  elements.forEach((element) => { 
    const num = parseInt(element.textContent, 10);
    if (num === findNum) {
      const textNode = element.parentNode;
      const transform = textNode.getAttribute("transform");
      const [x, y] = transform.substring(transform.indexOf("(") + 1, transform.indexOf(")")).split(" ");

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", parseFloat(x) + 7.5);
      circle.setAttribute("cy", parseFloat(y) - 5);
      circle.setAttribute("r", 15);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "red");
      circle.setAttribute("stroke-width", 4);

      element.parentNode.parentNode.parentNode.appendChild(circle);
    }
  });
}
