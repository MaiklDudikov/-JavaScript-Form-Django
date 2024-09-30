$(()=>{
    const output = $('#output');
    $('ul#proverbs').on('mouseenter', 'li',(event)=>{
        console.log($(event.target));
        output.text($(event.target).data('text'));
    }).on('mouseleave', 'li', (event)=>{
        output.text('');
    });
})
