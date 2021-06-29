# nodeEdgeConverter

This program will convert the node data from CSV (comma separated values) to json data usable for SimpleNetInt.

In short, download the spreadsheet as a .csv file and put it in the same folder as the program is. Make sure the program has the correct csv file name and then run it. The results should be output to a file called "nodes.json"
# Usage

## Install

Install python to run the program, as well as the necessary libraries to run it (pandas, numpy)

Download the language from here: https://www.python.org/downloads/ 

## Things to do before running the program

To make sure that the conversion is being fed the right information, make sure you have the data in its correct form (no typos, variant spellings, etc.) This program is case sensitive!

I have made a separate tab for the conversion called "Nodes for Conversion". Sort the nodes by "Primary ToI" and "Decade start" within their respective groups.

After you are sure that the node details are correct, download the spreadsheet as a csv file, and modify the program to use that file name.



## Details
I have added fields that you can modify in the python program to adjust pixel spacing as needed. The one field that you need to make sure is correct each time you convert is the name of the csv file that the program is reading. 

In addition to this, I've added a print out so that you see the number of rows and columns that the converter has produced, alongside the names of the rows and columns. Use this to double check that the right information is there.


## Running the program

To execute the program, all you need to do is to run this on your command prompt or terminal 
```python
python nodeEdgeConverter.py
```