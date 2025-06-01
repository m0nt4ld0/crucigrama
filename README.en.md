
# Crossword

## **Index**
- [Español 🇪🇸](#crucigrama-🇪🇸)
- [English](#-crossword)

## **Crossword 🇬🇧 **
- [Generate your own crossword](#generate-your-own-crossword-💡)
- [Generate your own crossword using a JSON](#generate-your-own-crossword-using-a-json)
- [Print the crossword](#print-the-crossword-🖨️)

### **Generate your own crossword** 💡

Write the word that will be displayed vertically and then click the **🚀Let’s go!** button.

![image](https://github.com/user-attachments/assets/98f0cb78-671c-40be-9a90-c68a7f5fdb4d)

Two text boxes will be displayed for each letter of the word:

![image](https://github.com/user-attachments/assets/3caaa2f5-36b9-478e-be74-3a785afb53c3)

- On the _left_, enter the _word_ that needs to be guessed (the answer).
- On the _right_, enter the _description_, which will act as a clue.

You can also [generate your own crossword using a JSON](#generate-your-own-crossword-using-a-json), instead of manually entering each word and its description.

### **Generate your own crossword using a JSON**

With this tool, you can load the desired structure to create your own **custom crossword**. The crossword must follow the **JSON format**, with the structure shown below. An example JSON is also included. Simply modifying the values of the sample JSON allows you to create a new crossword.

Access the tool [by clicking here](https://m0nt4ld0.github.io/crucigrama/).

![image](https://github.com/user-attachments/assets/d6b948e3-97ff-4738-8f10-0515ac57b297)

The JSON to be inserted must contain the following format:

- **vword**: The main word, shown vertically as a "hint".
- **refs**: Array with the crossword references (clues for the player to guess the word).
- **answers**: Array with the answer words.

Below is an example:

```
[
  {
     "vword": "Freud",
     "refs": [
        "Ancient pseudoscientific theory, now invalid, that claimed to determine character and personality traits based on the shape of the skull and facial features.",
        "Force that during the analysis ‘defends itself by all means against the cure and clings to the illness and suffering at all costs’",
        "Complex of...",
        "Source of constantly flowing stimuli, originating from internal excitation (unlike external stimulus), linked to a temporary object. Its satisfaction is partial.",
        "Projection, introjection, projective identification—these are all defense mechanisms..."
     ],
     "answers": [
        "phrenology",
        "resistance",
        "Oedipus",
        "drive",
        "defense"       
     ]
  }
]
```

This JSON will create the following crossword:

![image](https://github.com/user-attachments/assets/c9478e37-1f0a-4a0e-9260-5c45e713d6e3)

### **Print the crossword** 🖨️
Once your custom crossword is loaded, you can print it by clicking the corresponding button. It will open a new blank page with the crossword to fill in and its clues. You can print it or save it on your device as a PDF.

Click the **Print** button  
![image](https://github.com/user-attachments/assets/e7f20174-c0e0-4fe5-b842-3612a6768fd7)

The following page will open for printing. In the selection panel on the right, you can choose to print it (with your configured printer) or save it as a PDF.

![image](https://github.com/user-attachments/assets/12a88238-b609-42be-a203-69f1f96f4de0)
