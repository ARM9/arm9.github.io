
var notes_flat = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
var notes_sharp = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

var chord_type = ['', 'm', 'dim', 'aug', 'Maj7', 'm7', '7', 'm7b5', 'mMaj7', 'dim7', 'aug7', 'sus2', 'sus4', '7sus4'];
var extensions = ['9', 'b9', '#9', '11', '#11', '13', 'b13'];
var inversions = ['', '6', '6/4', '7', '6/5', '4/3', '4/2'];

var scale = ['major', 'minor'];

function rng(l, u) {
    // random integer in range [l,u)
    return (Math.random() * (u  - l) + l)|0;
}

function getRandom(arr) {
    return arr[rng(0, arr.length)];
}

function getNote(sharp) {
    var n = sharp ? notes_sharp : notes_flat;
    return getRandom(n);
}

function getChord(sharp) {
    return getNote(sharp) + getRandom(chord_type);
}

function getInversion() {
    return getRandom(inversions);
}

function getScale(sharp) {
    return getNote(sharp) + ' ' + getRandom(scale);
}

var roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

function toRoman(n) {
    var t = roman[rng(0, roman.length)];
    return Math.random() < 0.5 ? t.toUpperCase() : t;
}

function getProgression() {
    var s = '';
    for(var n = rng(2,6); n > 0; n--) {
	var t = getRandom(roman);
	s += ' ' + (Math.random() < 0.5 ? t.toUpperCase() : t);
    }
    return s;
}

