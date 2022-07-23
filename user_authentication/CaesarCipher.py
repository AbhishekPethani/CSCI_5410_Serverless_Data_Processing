import string


def caesar(input, key_step):
    alphabets = (string.ascii_lowercase, string.ascii_uppercase, string.digits)

    def shift(alphabet):
        return alphabet[key_step:] + alphabet[:key_step]

    shifted_alphabets = tuple(map(shift, alphabets))
    joined_aphabets = ''.join(alphabets)
    joined_shifted_alphabets = ''.join(shifted_alphabets)
    table = str.maketrans(joined_aphabets, joined_shifted_alphabets)
    return input.translate(table)


if __name__ == "__main__":
    print(caesar('Abc-xyZ.012:789', key_step=4))

"""
References:
Docs on str.maketrans.
Docs on str.translate.
Docs on the string library
"""
