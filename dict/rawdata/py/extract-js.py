str_input_files=[ 	"../data/data.adj", 
					"../data/data.adv", 
					"../data/data.noun", 
					"../data/data.verb" ]
str_output_files=[	"../../app/js/data_adj.js", 
					"../../app/js/data_adv.js", 
					"../../app/js/data_noun.js", 
					"../../app/js/data_verb.js"  ]

for file_count in range (0, len(str_input_files)):
	line_num = 1
	with open(str_input_files[file_count]) as f:
		fw = open( str_output_files[file_count], "w" )
		fw.write( "define(function(){\n" )
		fw.write( "\tvar str=[\n")
		for line in f:
			if line_num > 30:	#this if to add , to add array element except first and last
				fw.write( ",\n" )
			if line_num >= 30:
				split_line = line.split("|")
				split_for_word = split_line[0].split(" ");
				fw.write(  "\t\t{{\"{}\":\"{}\"}}".format(
					split_for_word[4], 
					split_line[1].strip().replace( "\"","\\\"" )) )
			line_num += 1
		fw.write( "\n\t];\n" )	#first \n here is for making sure last array has new line
		fw.write( "\treturn str;\n" )
		fw.write( "});\n" );
		fw.close()
	