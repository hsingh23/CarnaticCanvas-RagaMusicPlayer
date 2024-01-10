import pygame
import numpy as np
import time

# Initialize pygame mixer
pygame.mixer.init(frequency=44100, size=-16, channels=1)

# Define the frequencies for Sa to Ni'' (three octaves)
# @formatter:off
notes = {
    # First Octave
    "C": 261.63,
    "Sa": 261.63,
    "C#": 277.18,
    "D_": 277.18,
    "Re_": 277.18,
    "D": 293.66,
    "Re": 293.66,
    "D#": 311.13,
    "E_": 311.13,
    "Ga_": 311.13,
    "E": 329.63,
    "Ga": 329.63,
    "F": 349.23,
    "Ma": 349.23,
    "F#": 369.99,
    "G_": 369.99,
    "Ma#": 369.99,
    "G": 392.00,
    "Pa": 392.00,
    "G#": 415.30,
    "A_": 415.30,
    "Dha_": 415.30,
    "A": 440.00,
    "Dha": 440.00,
    "A#": 466.16,
    "B_": 466.16,
    "Ni_": 466.16,
    "B": 493.88,
    "Ni": 493.88,
    # Second Octave
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
    "A'": 880.00,
    "Dha'": 880.00,
    "A#'": 932.33,
    "B_'": 932.33,
    "Ni_'": 932.33,
    "B'": 987.77,
    "Ni'": 987.77,
    # Third Octave
    "C''": 1046.50,
    "Sa''": 1046.50,
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
    "A''": 1760.00,
    "Dha''": 1760.00,
    "A#''": 1864.66,
    "B_''": 1864.66,
    "Ni_''": 1864.66,
    "B''": 1975.53,
    "Ni''": 1975.53,
}

# @formatter:on


# Function to generate a sine wave corresponding to a note
def generate_sine_wave(note, duration):
    frequency = notes[note]
    sample_rate = 44100  # Samples per second
    t = np.linspace(0, duration, int(sample_rate * duration), False)  # Time axis
    wave = np.sin(frequency * t * 2 * np.pi)  # Sine wave
    wave = (wave * 32767 / np.max(np.abs(wave))).astype(
        np.int16
    )  # Normalize to 16-bit range
    return wave


# Function to play a note
def play_note(note, duration):
    if note in notes:
        wave = generate_sine_wave(note, duration)
        sound = pygame.sndarray.make_sound(wave)
        sound.play()
        time.sleep(duration)


# Function to read notes from a file and play them
def play_notes_from_file(filename):
    with open(filename, "r") as file:
        content = file.read()
        note_sequence = content.split()

        for note in note_sequence:
            if note == ",":
                time.sleep(0.25)  # Pause for comma
            else:
                play_note(note, 1)


# Example usage
play_notes_from_file("ananda bhairavi2.txt")
