document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") Tone.context.resume();
});

let tempo = $("#tempoSlider");
Tone.Transport.bpm.value = tempo.val();

$("#tempoSlider").on("input", function() {
  Tone.Transport.bpm.value = tempo.val();
  noteTime = 1800 / tempo.val();
  $("#tempoDiv h4").html("BPM:" + tempo.val());
});

const drums = [
  new Tone.Player("/drums/snare.wav"),
  new Tone.Player("/drums/clap.wav"),
  new Tone.Player("/drums/kick.wav"),
  new Tone.Player("/drums/cymbol.wav"),
  new Tone.Player("/drums/hihat-open.wav"),
  new Tone.Player("/drums/hihat-closed.wav"),
  new Tone.Player("/drums/shaker.wav")
];

let octave = 3;

function instrumentVolume(sliderName, synthName) {
  $(sliderName).on("input", function() {
    synthName.forEach(synth => (synth.volume.value = $(sliderName).val()));
  });
}

// for (var key in instruments) {
//   instruments[key].toMaster();
// }

var gain = new Tone.Gain(0.4);
gain.toMaster();
drums.forEach(drum => drum.toMaster());

let index = 0;

Tone.context.lookAhead = 0;

function playListener() {
  $("#playButton").click(function() {
    Tone.Transport.start();
    Tone.Transport.scheduleRepeat(repeat, "8n");
    removeListener($("#playButton"));
  });
}

playListener();

function repeat(time) {
  repeater(drums, "drums");
  index++;
}

let instrumentSelect = $("#instrumentOptionSelect").val();

$("#instrumentOptionSelect").on("change", function() {
  instrumentSelect = $("#instrumentOptionSelect").val();
});

instrumentVolume("#drumsVolumeSlider", drums);
instrumentVolume(`${instrumentSelect}`);

$(".instrumentOctave select").on("change", function() {
  octave = $(".instrumentOctave select").val();
});

let noteTime = 1800 / tempo.val();

function repeater(notes, notesString) {
  let step = index % beatCountValue;
  let bpm = tempo.val();
  let bpmCount = 30000 / bpm;
  for (var i = 0; i < notes.length; i++) {
    let note = notes[i],
      beat = $(`#${notesString}${i + 1} .beat${step + 1}`);
    if (beat.hasClass("on")) {
      if (notes === drums) {
        note.start();
      } else if (notes === instrumentSelect) {
        instruments[notes].triggerAttackRelease(`${allNotes[i]}${octave}`);
      }
      beat.toggleClass("onPlaying");
      setTimeout(() => {
        beat.removeClass("onPlaying");
      }, bpmCount);
    } else {
      beat.toggleClass("offPlaying");
      setTimeout(() => {
        beat.removeClass("offPlaying");
      }, bpmCount);
    }
  }
}

// function repeater(instrumentChoice) {
//     let notes = Object.keys(SampleLibrary[instrumentSelect]);
//     let step = index % beatCountValue;
//     let bpm = tempo.val();
//     let bpmCount = 30000 / bpm;
//     for (var i = 0; i < notes.length; i++) {
//         let note = notes[i];
//         let beat = $(`#${instrumentChoice}${i+1} .beat${step + 1}`);
//         if (beat.hasClass('on')) {
//             if (notes === drums) {
//                 note.start();
//             } else if (notes === instrumentSelect) {
//                 instruments[instrumentChoice].triggerAttackRelease(`${notes[i]}`);
//             }
//             beat.toggleClass('onPlaying');
//             setTimeout(() => {
//                 beat.removeClass('onPlaying');
//             }, bpmCount);
//         } else {
//             beat.toggleClass('offPlaying');
//             setTimeout(() => {
//                 beat.removeClass('offPlaying');
//             }, bpmCount);
//         }
//     }
// }

$(".instrumentAddButton").on("click", function() {
  drawInstrumentControls(instrumentSelect);
  drawInstrumentBlock(instrumentSelect);
  drawQuarterNotes(
    instrumentSelect,
    Object.keys(SampleLibrary[instrumentSelect]).length
  );
});

function drawInstrumentControls(instrument) {
  $(`#${instrument}`).append(
    `<div class="instrumentControls"><h3>${instrument.toUpperCase()}</h3></div`
  );
  $(`#${instrument} .instrumentControls`).append(
    `<div class="instrumentVolumeBox"><h4>Vol</h4><input type="range" class="slider" min="-20" max="20" step="1" value="0"></div>`
  );
}

// drawInstrumentBlock(instrumentSelect);

var beatCount = document.getElementById("beatCount");
var beatCountValue = beatCount.value;

function drawQuarterNotes(soundType, count) {
  // let currentBeatCount = $('#drums1 .clickBeat').length;
  for (let y = 1; y <= count; y++) {
    for (let x = 1; x <= beatCountValue; x++) {
      $("#" + soundType + y).append(`<div class="clickBeat beat${x}"></div>`);
      if ((x - 1) % 4 === 0) {
        $(".beat" + x).addClass("emphasize");
      }
    }
  }
}
drawQuarterNotes("drums", 7);
drawQuarterNotes("synths", 12);
// drawQuarterNotes(instrumentSelect, Object.keys(SampleLibrary[instrumentSelect]).length)
// drawQuarterNotes('#polySynths', 12);
// drawQuarterNotes('#bassSynths', 12);

const addListener = function(element) {
  $(element).click(function() {
    $(this).toggleClass("on");
  });
};

const removeListener = function(element) {
  $(element).off("click");
};

addListener(".clickBeat");

function drawInstrumentBlock(instrument) {
  $(".player").append(`<div id="${instrument}"></div>`);
  drawInstrumentControls(instrument);
  let instrumentIndex = 1;
  for (var key in SampleLibrary[instrument]) {
    $(`#${instrument}`).append(
      `<div class="instruments" id="${instrument}${instrumentIndex}"><div class="soundType">${key}</div></div>`
    );
    instrumentIndex++;
  }
  // removeListener('.clickBeat');
  // addListener('.clickBeat');
  instrumentIndex = 0;
}

// var beatCountChange = function (i) {
//     let oldBeatCount = $(`#drums1 .clickBeat`).length;
//     beatCountValue = beatCount.value;
//     if (oldBeatCount < beatCountValue) {
//         for (let x = oldBeatCount + 1; x <= beatCountValue; x++) {
//             if (x == 1 || (x - 1) % 4 == 0) {
//                 $('#drums' + i).append(`<div class="clickBeat beat${x} emphasize"></div>`)
//             } else {
//                 $('#drums' + i).append(`<div class="clickBeat beat${x}"></div>`)
//             }
//         }
//     } else if (oldBeatCount > beatCountValue) {
//         for (let x = oldBeatCount; x > beatCountValue; x--) {
//             $('.beat' + x).remove();
//         }
//     }
// }

var beatCountChange = function(soundType) {
  let oldBeatCount = $(`#${soundType}1 .clickBeat`).length;
  beatCountValue = beatCount.value;
  for (let d = 1; d <= oldBeatCount; d++) {
    if (oldBeatCount < beatCountValue) {
      for (let x = oldBeatCount + 1; x <= beatCountValue; x++) {
        if (x == 1 || (x - 1) % 4 == 0) {
          $(`#${soundType}${d}`).append(
            `<div class="clickBeat beat${x} emphasize"></div>`
          );
        } else {
          $(`#${soundType}${d}`).append(
            `<div class="clickBeat beat${x}"></div>`
          );
        }
      }
    } else if (oldBeatCount > beatCountValue) {
      for (let x = oldBeatCount; x > beatCountValue; x--) {
        $(".beat" + x).remove();
      }
    }
  }
};

$("#beatCount").on("change", function() {
  beatCountChange("drums");
  removeListener(".clickBeat");
  addListener(".clickBeat");
  $(".player").attr("overflow-x", "hidden");
  setTimeout(() => {
    $(".player").css("overflow-x", "scroll");
  }, 1);
});

$("#stopButton").click(function() {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  index = 0;
  playListener();
});

$("#clearButton").click(function() {
  for (let x = 1; x <= beatCountValue; x++) {
    $(".beat" + x).removeClass("on");
  }
});
