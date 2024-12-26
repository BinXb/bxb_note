# 利用 grid 实现简单的瀑布流布局

主要利用 css 属性

- display:grid
- grid-template-rows
- clientHeight

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>grid_water</title>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const el = document.querySelector(".box");
        let box = document.querySelectorAll(".box");
        for (let index = 0; index < box.length; index++) {
          let height = Math.floor(Math.random() * 200) + 100;
          box[index].style.height = height + "px";
          const rows = Math.ceil(box[index].clientHeight / 5) + 1;
          box[index].style.gridRow = `auto / span ${rows}`;
        }
      });
    </script>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
      }

      .main {
        padding: 6px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 5px;
        grid-column-gap: 4px;
        height: 100vh;
        overflow-y: scroll;
      }

      .box {
        box-sizing: border-box;
        border: 1px solid #ccc;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
      <div class="box">6</div>
      <div class="box">7</div>
      <div class="box">8</div>
      <div class="box">9</div>
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
      <div class="box">6</div>
      <div class="box">7</div>
      <div class="box">8</div>
      <div class="box">9</div>
      <div class="box">1</div>
    </div>
  </body>
</html>
```

效果图

![瀑布流](../images/grid_water.png)
