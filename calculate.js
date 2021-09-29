function calculate(){

    let notes = document.getElementById('notes').value;
    notes = notes.split('/');
    
    length = Number(notes[0]);
    notes.shift();

    let noteSpace = 0;
    let otherSpace = 0;

    // const lut = {
    //     wd: ['w.', 'dotted whole', 40],
    //     w: ['w', 'whole', 30],
    //     hd: ['h.', 'dotted half', 24],
    //     h: ['h', 'half', 20],
    //     qd: ['q.', 'dotted quarter', 120/7],
    //     q: ['q', 'quarter', 15],
    //     ed: ['e.', 'dotted 8th', 40/3],
    //     e: ['e', '8th', 12],
    //     sd: ['dotted 16th', 120/11],
    //     s: ['s', '16th', 10],
    //     td: ['t.', 'dotted 32nd', 120/13],
    //     t: ['t', '32nd', 60/7]
    // };

    const addNoteSpace = n => {
        switch(n){
            case 'w.':
                noteSpace += 40;
                break;
            case 'w':
                noteSpace += 30;
                break;
            case 'h.':
                noteSpace += 24;
                break;
            case 'h':
                noteSpace += 20;
                break;
            case 'q.':
                noteSpace += 120/7;
                break;
            case 'q':
                noteSpace += 15;
                break;
            case 'e.':
                noteSpace += 40/3;
                break;
            case 'e':
                noteSpace += 12;
                break;
            case 's.':
                noteSpace += 120/11;
                break;
            case 's':
                noteSpace += 10;
                break;
            case 't.':
                noteSpace += 120/13;
                break;
            case 't':
                noteSpace += 60/7;
                break;
            default:
                noteSpace += 0;
        }
    }

    notes.forEach(note => {

        if(!note.includes('x') && !note.includes('a')){
            addNoteSpace(note);
        } else if(note.includes('x') && !note.includes('.') && !note.includes('a')){
            let x = Number(note.match(/\d+/g));
            for(let i = 0; i < x; i++){
                addNoteSpace(note.charAt(0));
            }
        } else if(note.includes('x') && note.includes('.') && !note.includes('a')){
            let x = Number(note.match(/\d+/g));
            for(let i = 0; i < x; i++){
                addNoteSpace(note.substring(0, 2));
            }
        } else if(note.includes('a')){
            let x = Number(note.match(/\d+/g));
            otherSpace += x;
        }

    });

    space = length - otherSpace;
    unit = space/noteSpace;

    let notesNew = [];

    notes.forEach(note => {
        if(note.includes('a')){
            notesNew = notesNew;
        } else if(note.includes('.')){
            notesNew.push(note.substring(0, 2));
        } else if(!note.includes('.')){
            notesNew.push(note.charAt(0));
        }
    });

    notesNew = [...new Set(notesNew)];
    const result = document.querySelector('#result');
    result.innerHTML = '';
    const error = document.querySelector('#error');
    error.innerHTML = '';

    notesNew.forEach(note => {
        switch(note){
            case 'w.':
                result.innerHTML += `<li>dotted whole: ${unit*40} units</li>`;
                break;
            case 'w':
                result.innerHTML += `<li>whole: ${unit*30} units</li>`; 
                break;
            case 'h.':
                result.innerHTML += `<li>dotted half: ${unit*24} units</li>`;
                break;
            case 'h':
                result.innerHTML += `<li>half: ${unit*20} units</li>`;
                break;
            case 'q.':
                result.innerHTML += `<li>dotted quarter: ${unit*(120/7)} units</li>`;
                break;
            case 'q':
                result.innerHTML += `<li>quarter: ${unit*15} units</li>`;
                break;
            case 'e.':
                result.innerHTML += `<li>dotted 8th: ${unit*(40/3)} units</li>`;
                break;
            case 'e':
                result.innerHTML += `<li>8th: ${unit*12} units</li>`;
                break;
            case 's.':
                result.innerHTML += `<li>dotted 16th: ${unit*(120/11)} units</li>`;
                break;
            case 's':
                result.innerHTML += `<li>16th: ${unit*10} units</li>`;
                break;
            case 't.':
                result.innerHTML += `<li>dotted 32nd: ${unit*(120/13)} units</li>`;
                break;
            case 't':
                result.innerHTML += `<li>16th: ${unit*60/7} units</li`;
        }
    });

    if($('#result').is(':empty')){
        error.innerHTML += 'Error: please check your input!';
    }

};