window.addEventListener('load', function () {
    
    let element_count = 1;

    // add HTML elements
    document.querySelector('svg#plus').addEventListener('click', function () {
        if (element_count === 1) {
            document.getElementById('minus').classList.remove('disabled');
        }
        element_count+=1;
        // addField(element_count);
        let adding_element = '<span class="block_content" id="Number_' + element_count + '"><input type="number" name="Number_' + element_count + '_start" value="1">&#61;&gt;<input type="number" name="Number_' + element_count + '_end" value="1"></span><textarea name="String_' + element_count + '" id="String_' + element_count + '" class="block_content"></textarea>'
        document.querySelector('#String_' + (element_count - 1)).insertAdjacentHTML('afterend', adding_element);
    })

    document.querySelector('svg#minus').addEventListener('click', function () {
        if (element_count !== 1) {
            document.querySelector('span#Number_' + element_count).remove();
            document.querySelector('#String_' + element_count).remove();
            if (element_count === 2) {
                document.getElementById('minus').classList.add('disabled');
            }
            element_count-=1;
        }
    })
    
    document.getElementById('apply').addEventListener('click', (ev) => {
        document.getElementById('apply').insertAdjacentHTML('afterbegin', '<span class="ripple" style="left: ' + ev.offsetX + 'px; top: ' + ev.offsetY + 'px;"></span>');

        let width_loop = [];
        for (let i = 1; i <= element_count; i++) {
            // console.log('width_loop - i' + i)
            width_loop.push(Math.abs((document.querySelector('input[name="Number_' + i  + '_start"]').value - document.querySelector('input[name="Number_' + i + '_end"]').value)));
            // console.log('width_loop' + width_loop)
        }
        let loopNumber = Math.max.apply(null, width_loop);
        // console.log('MAX' + loopNumber)

        setResult(loopNumber);
    })

    document.getElementById('reset').addEventListener('click', (ev) => {
        document.getElementById('reset').insertAdjacentHTML('afterbegin', '<span class="ripple" style="left: ' + ev.offsetX + 'px; top: ' + ev.offsetY + 'px;"></span>');

        let allTextarea = document.querySelectorAll('#primary textarea');

        for (textarea of allTextarea) {
            textarea.value = '';
        }
    })

    function setResult(loopNumber) {
        let result = [];
        for (let n = 0; n <= loopNumber; n++) {
            let result_string = '';
            // console.log('n' + n)
            for (let i = 0; i <= element_count; i++) {
                // console.log('i' + i + '-' + element_count)
                if (i !== element_count) {
                    result_string = result_string + document.querySelector('textarea[name="String_' + i + '"]').value + (n + Math.min(document.querySelector('input[name="Number_' + (i + 1)  + '_start"]').value, document.querySelector('input[name="Number_' + (i + 1)  + '_end"]').value)).toString();
                    // console.log(i + '(上)' + result_string);
                } else {
                    // console.log(i + '(下入口)' + result_string);
                    result_string = result_string + document.querySelector('textarea[name="String_' + i + '"]').value;
                    result.push(result_string);
                    // console.log(i + '(下出口)' + result_string);
                }
            }
        }
        
        // console.log(result);
        document.getElementById('result').innerHTML = result.join('\n');
    }

    document.getElementById('clip').addEventListener('click', (ev) => {
        document.getElementById('clip').insertAdjacentHTML('afterbegin', '<span class="ripple" style="left: ' + ev.offsetX + 'px; top: ' + ev.offsetY + 'px;"></span>');
        document.getElementById('result').select();
        document.execCommand("copy");
    
    })

})