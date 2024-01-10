const audioContext = new AudioContext();

// Note frequencies (you can expand this to include all notes)
const noteFrequencies = (notes = {
  // # First Octave
  C: 261.63,
  Sa: 261.63,
  'C#': 277.18,
  D_: 277.18,
  Re_: 277.18,
  D: 293.66,
  Re: 293.66,
  'D#': 311.13,
  E_: 311.13,
  Ga_: 311.13,
  E: 329.63,
  Ga: 329.63,
  F: 349.23,
  Ma: 349.23,
  'F#': 369.99,
  G_: 369.99,
  'Ma#': 369.99,
  G: 392.0,
  Pa: 392.0,
  'G#': 415.3,
  A_: 415.3,
  Dha_: 415.3,
  A: 440.0,
  Dha: 440.0,
  'A#': 466.16,
  B_: 466.16,
  Ni_: 466.16,
  B: 493.88,
  Ni: 493.88,

  // # Second Octave
  "C'": 523.25,
  "Sa'": 523.25,
  "C#'": 554.37,
  "D_'": 554.37,
  "Re_'": 554.37,
  "D'": 587.33,
  "Re'": 587.33,
  "D#'": 622.25,
  "E_'": 622.25,
  "Ga_'": 622.25,
  "E'": 659.26,
  "Ga'": 659.26,
  "F'": 698.46,
  "Ma'": 698.46,
  "F#'": 739.99,
  "G_'": 739.99,
  "Ma#'": 739.99,
  "G'": 783.99,
  "Pa'": 783.99,
  "G#'": 830.61,
  "A_'": 830.61,
  "Dha_'": 830.61,
  "A'": 880.0,
  "Dha'": 880.0,
  "A#'": 932.33,
  "B_'": 932.33,
  "Ni_'": 932.33,
  "B'": 987.77,
  "Ni'": 987.77,

  // # Third Octave
  "C''": 1046.5,
  "Sa''": 1046.5,
  "C#''": 1108.73,
  "D_''": 1108.73,
  "Re_''": 1108.73,
  "D''": 1174.66,
  "Re''": 1174.66,
  "D#''": 1244.51,
  "E_''": 1244.51,
  "Ga_''": 1244.51,
  "E''": 1318.51,
  "Ga''": 1318.51,
  "F''": 1396.91,
  "Ma''": 1396.91,
  "F#''": 1479.98,
  "G_''": 1479.98,
  "Ma#''": 1479.98,
  "G''": 1567.98,
  "Pa''": 1567.98,
  "G#''": 1661.22,
  "A_''": 1661.22,
  "Dha_''": 1661.22,
  "A''": 1760.0,
  "Dha''": 1760.0,
  "A#''": 1864.66,
  "B_''": 1864.66,
  "Ni_''": 1864.66,
  "B''": 1975.53,
  "Ni''": 1975.53,
});

const ragas = [
  {
    name: 'pick a raga',
    aaroh: '',
    avaroh: '',
  },
  {
    name: 'Shankarabharanam',
    aaroh: "Sa Re Ga Ma Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma Ga Re Sa",
  },
  {
    name: 'Mayamalavagowla',
    aaroh: "Sa Re Ga Ma Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma Ga Re Sa",
  },
  {
    name: 'Kalyani',
    aaroh: "Sa Re Ga Ma# Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma# Ga Re Sa",
  },
  {
    name: 'Todi',
    aaroh: "Sa Re_ Ga_ Ma Pa Dha_ Ni Sa'",
    avaroh: "Sa' Ni Dha_ Pa Ma Ga_ Re_ Sa",
  },
  {
    name: 'Bhairavi',
    aaroh: "Sa Re_ Ga Ma Pa Dha_ Ni_ Sa'",
    avaroh: "Sa' Ni_ Dha_ Pa Ma Ga Re_ Sa",
  },
  {
    name: 'Kharaharapriya',
    aaroh: "Sa Re Ga Ma Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma Ga Re Sa",
  },
  {
    name: 'Harikambhoji',
    aaroh: "Sa Re Ga Ma Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma Ga Re Sa",
  },
  {
    name: 'Kamboji',
    aaroh: "Sa Re Ga Ma Pa Dha Ni Sa'",
    avaroh: "Sa' Ni Dha Pa Ma Ga Re Sa",
  },
  {
    name: 'Bilahari',
    aaroh: "Sa Re Ga Pa Dha Sa'",
    avaroh: "Sa' Ni Dha Pa Ga Re Sa",
  },
  {
    name: 'Mohanam',
    aaroh: "Sa Re Ga Pa Dha Sa'",
    avaroh: "Sa' Dha Pa Ga Re Sa",
  },
];

function playTone(freq, duration) {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = freq;

  const envelope = audioContext.createGain();
  oscillator.connect(envelope);
  envelope.connect(audioContext.destination);

  envelope.gain.setValueAtTime(0, audioContext.currentTime);
  envelope.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
  envelope.gain.linearRampToValueAtTime(
    0,
    audioContext.currentTime + duration - 0.1
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playNotes() {
  const notesInput = document.getElementById('noteInput').value.split(' ');
  let currentTime = 0;

  notesInput.forEach((note) => {
    if (noteFrequencies[note]) {
      setTimeout(() => playTone(noteFrequencies[note], 1), currentTime * 1000);
      currentTime += 1;
    } else if (note === ',') {
      currentTime += 0.25;
    }
  });
}

function populateRagaSelector() {
  const selector = document.getElementById('ragaSelector');
  ragas.forEach((raga) => {
    const option = document.createElement('option');
    option.value = raga.name;
    option.textContent = raga.name;
    selector.appendChild(option);
  });
}

function populateRaga() {
  const selectedRaga = document.getElementById('ragaSelector').value;
  const raga = ragas.find((r) => r.name === selectedRaga);
  if (raga) {
    document.getElementById(
      'noteInput'
    ).value = `${raga.aaroh} , , , ${raga.avaroh}`;
  }
}

// Initialize the raga selector on page load
window.onload = populateRagaSelector;
