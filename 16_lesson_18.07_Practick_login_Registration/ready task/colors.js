document.getElementById('addColor').addEventListener('click', function() {
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;

    if (red === '' || green === '' || blue === '') {
        alert('Please fill in all fields');
        return;
    }

    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
        alert('Values must be between 0 and 255');
        return;
    }

    const colorBlock = document.createElement('div');
    colorBlock.className = 'color-block';
    colorBlock.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    colorBlock.innerHTML = `<p>RGB (${red}, ${green}, ${blue})</p>`;

    document.getElementById('palette').appendChild(colorBlock);

    // Clear input fields after adding the color
    document.getElementById('red').value = '';
    document.getElementById('green').value = '';
    document.getElementById('blue').value = '';
});
