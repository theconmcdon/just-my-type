$(document).ready(function (e) {
    $('#keyboard-upper-container').hide();

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let numberOfWords = sentences.join(' ').split(" ").length;

    let i = 0;
    $('#sentence').html(sentences[i]);
    let startPos = 0;
    let j = 0;
    let numberOfMistakes = 0;
    let individualSent = sentences[i].split('');
   
    $('#target-letter').html(individualSent[i])
    let startTime = null;

    $(document).keydown(function (e) {
        if(e.keyCode === 32) {
            e.preventDefault();
        }
        if (startTime === null) {
            startTime = Date.now();
        }
        
        startPos = startPos += 1.5;
        if (e.which === 16 && e.shiftKey === true) {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        } else {
            const key = '#' + e.key.charCodeAt(0);
            $("" + key + "").css({ 'background-color': 'grey', 'font-size': '38px', 'color': 'black' });

            $('#yellow-block').css({ 'margin-left': startPos + '%' });

            if (e.key === individualSent[j]) {
                $('#feedback').html('&#10003')
                $('#feedback').addClass('glyphicon-ok')
            }
            if (e.key !== individualSent[j]) {
                $('#feedback').html('&#120');
                $('#feedback').addClass('glyphicon-remove');
                numberOfMistakes++;
            }

            $('#target-letter').html(individualSent[j]);
            j++

            if (j === sentences[i].length) {
                j = 0;
                i++;
                if (i === sentences.length) {
                    let finishTime = Date.now();
                    
                    let seconds = finishTime - startTime;
                    seconds = seconds/1000;
                    let minutes = seconds/60;
                    console.log("minutes ", minutes)
                    let results = numberOfWords / minutes - (2 * numberOfMistakes);
                    
                    function display(res) {
                        alert('Here are your results: ' + res.toFixed(2));
                    }
                    display(results)
                }

                individualSent = sentences[i].split('');
                startPos = 0;
                $('#yellow-block').css({ 'margin-left': '-15px' });
                $('#sentence').html(sentences[i]);
            }

        }
    });

    $(document).keyup(function (e) {
        if (e.which === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        } else {
            $('#feedback').removeClass('glyphicon-ok');
            $('#feedback').removeClass('glyphicon-remove');
            $('#feedback').html(' ');
            $('#target-letter').html(individualSent[j]);
        }
        const selectedKey = '#' + e.key.charCodeAt(0);
        $("" + selectedKey + "").css({ 'background-color': 'grey', 'font-size': '14px', 'color': 'black' });
    })
});
