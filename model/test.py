import torch
from torch.nn.utils.rnn import pad_sequence
import numpy as np

text="""The quick brown fox jumps over the lazy dog The quick brown fox is very fast"""

#Simple Tokenizer
chars=sorted(list(set(text)))
vocab_size=len(chars)

stoi={ch:i for i,ch in enumerate(chars)}
itos={i:ch for i,ch in enumerate(chars)}

encode=lambda s: [stoi[c] for c in s]
decode=lambda l: ''.join([itos[i] for i in l])

encoded_text=encode(text)
tensor_tokens=torch.tensor(encoded_text,dtype=torch.long)


input_sequences=[]
for line in text.split("."):
    token_list=tensor_tokens
    for i in range(1,len(token_list)):
        n_gram_sequence=token_list[:i+1]
        input_sequences.append(n_gram_sequence)

max_seq_length=max(len(seq) for seq in input_sequences)

input_sequences=pad_sequence(input_sequences,batch_first=True,padding_value=0.0)

X,y=input_sequences[:,:-1], input_sequences[:,-1]

print(y)