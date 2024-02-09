module.exports = () => {
  const src = 'https://unpkg.com/mermaid@10/dist/mermaid.esm.min.mjs';
  return `<script type="module" async>
    import mermaid from '${src}';
    mermaid.run({
      querySelector: '.mermaid',
      postRenderCallback: (id) => {
        const selector = '#'.concat(id);
        const chart = document.getElementById(id);
        chart.setAttribute('height', chart.getBoundingClientRect().height);
        chart.style.backgroundColor = 'inherit';
        const zoomable = svgPanZoom(selector, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true
        });
        console.log(zoomable);

        const fullscreenIcon = chart.parentElement.previousElementSibling;
        const pre = chart.parentElement.parentElement;

        const observer = new ResizeObserver(() => zoomable.resize().reset());
        observer.observe(pre);

        const classes = fullscreenIcon.querySelector('i').classList;
        fullscreenIcon.addEventListener('click', (ev) => {
          if (classes.contains('expand')) {
            pre.requestFullscreen().then(() => {
              classes.replace('expand', 'compress');
            });
          } else if (classes.contains('compress')) {
            document.exitFullscreen();
          }
        });

        document.addEventListener('fullscreenchange', (ev) => {
          if (!document.fullscreenElement) {
            // leaving fullscreen, so scroll to the element that was open
            ev.target.scrollIntoView();
            classes.replace('compress', 'expand');
          }
        });
      }
    });
  </script>`;
};
