# justCanvas

justCanvas is a low level lib to draw and display images on HTML canvas elements.

It provides shapes and basic elements. An animation endpoint is included.

## Supported shapes
* bezier
* circle
* line
* rectangle

Draw images with `image(img, x, y)` 
or more detailed e.g. zoomed with `imageZoom(img, zoomFactor, x, y)` 
or moved images with `imagePointer(img, x, y)`

## Usage

### Draw a rectangle
```javascript 1.8
let c = new Canvas();

document.querySelector('body').innerHTML = c.getHtml();

c.resize(window.innerHeight, window.innerWidth);

c.draw()
    .begin()
    .color('#000000')
    .rectangle(210, 10, 40, 40)
    .close();
```

### Draw a rectangle with a set of lines
```javascript 1.8
let c = new Canvas();

document.querySelector('body').innerHTML = c.getHtml();

 c.draw()
     .begin()
     .color('#ff0066')
     .line([
         [10, 10],
         [50, 10],
         [50, 50],
         [10, 50],
         [10, 10]
     ])
     .fill()
     .close();
```
As you can see it is possible to create new shapes from primitive ones.

Let's dive deeper:

### An animation

```javascript 1.8
let c = new Canvas(),
    i = 0,
    dx = .5;

document.querySelector('body').innerHTML = c.getHtml();

c.resize(window.innerHeight, window.innerWidth);

c.animate((_c, step, second) => {

     _c.draw()
         .begin()
         .color('#ff0066')
         .line([
             [10, 10],
             [50, 10],
             [50, 50],
             [10, 50],
             [10, 10]
         ])
         .fill()
         .close();

     if(i > 50 || i < -10) dx = -dx;

     i = i + dx;

     _c.draw()
         .begin()
         .color('#00cc66')
         .line([
             [10, 100],
             [125, 100 + i],
             [250, 100]
         ])
         .stroke()
         .close();

     _c.draw()
         .begin()
         .color('#000000')
         .rectangle(210, 10, 40, 40)
         .close();

     _c.draw()
         .begin()
         .color('#0066ff')
         .circle(120, 50, 5)
         .fill()
         .close();

     // chaining
     _c.draw()
         .begin()
         .color('#00cc66')
         .line([
             [10, 200],
             [250, 200],
             [315, 250]
         ])
         .circle(320, 250, 5)
         .stroke()
         .close();

    });
});
```

### Experimental event handler

```javascript 1.8
let c = new Canvas();

document.querySelector('body').innerHTML = c.getHtml();

 c.draw()
     .begin()
     .color('#000000')
     .rectangle(210, 10, 40, 40)
     .close()
     .on('click', (obj, type) => {

        console.log(obj, type);

         alert('blue birds');
     });
```