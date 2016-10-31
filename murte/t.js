
var notes_flat = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
var notes_sharp = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

var chord_type = ['', 'm', 'dim', 'aug', 'Maj7', 'm7', '7', 'm7b5', 'mMaj7', 'dim7', 'aug7', 'sus2', 'sus4', '7sus4'];
var extensions = ['9', 'b9', '#9', '11', '#11', '13', 'b13'];
var inversions = ['', '6', '6/4', '7', '6/5', '4/3', '4/2'];

var scale = ['major', 'minor'];

var modes = {
    major: ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
    harmonic_minor: ['harmonic minor', 'locrian #6', 'ionian #5', 'dorian #4', 'phrygian dominant', 'lydian #2', 'altered dominant bb7/ultra locrian'];
    melodic_minor: ['melodic minor', 'dorian b2', 'lydian #5', 'mixolydian #4', 'mixolydian b6', 'locrian #2', 'altered dominant/super locrian'];
};


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

var roman = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII'];

function toRoman(n) {
    return roman[n];
}

function getRoman() {
    var t = getRandom(roman);
    return Math.random() < 0.5 ? t.toLowerCase() : t;
}

function getProgression() {
    var s = '';
    for(var n = rng(2,6); n > 0; n--) {
	var t = getRandom(roman);
	s += ' ' + (Math.random() < 0.5 ? t.toLowerCase() : t);
    }
    return s;
}

