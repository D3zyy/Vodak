from flask import Flask, redirect,render_template, request

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

people = []
kamaradi = {}

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html',people = people), 200


@app.route('/registrace', methods=['GET'])
def druha_stranka():
    return render_template('registrace.html'), 200


def check_kamarad(username):

    if username  in kamaradi.values():
        return True
    else:
        return False



def check_unique_username(username):
    for person in people:
        if person['prezdivka'] == username:
            return False
    return True

@app.route('/check-kamarad/<username>', methods=['POST'])
def isKamaradValid(username):
        is_taken = check_kamarad(username)
        if is_taken is True:
            return "False", 200
        else:
            return "True", 200




@app.route('/check-username/<username>', methods=['POST'])
def isUsernameValid(username):
        is_unique = check_unique_username(username)
        if is_unique is True:
            return "True", 200
        else:
            return "False", 200




@app.route('/registrace', methods=['POST'])
def registrace():
    plave = request.form.get('je_plavec')
    prezdivka = request.form.get('nick')
    kamarad = request.form.get('kanoe_kamarad')


    validation_result = validate(prezdivka, plave, kamarad)
    validate_username = check_unique_username(prezdivka)
    validate_kamarad = check_kamarad(kamarad)
    if validation_result == True and validate_username == True and validate_kamarad == False:
        nova_osoba = {
            'plave': plave,
            'prezdivka': prezdivka,
            'kamarad': ""
        }

        people.append(nova_osoba)
        kamaradi[prezdivka] = kamarad
        
        for person in people:
            if kamarad == person.get("prezdivka"):
                person['kamarad'] = nova_osoba['prezdivka']
                nova_osoba['kamarad'] = kamarad
        
        
        return redirect('/')
    
        

    else:

        return "Chyba nebyli jste přihlášeni.",404

def validate(prezdivka, plavec, kamarad):
    if plavec == '1':
        pass
    else:
        return False

    import re
    validni_nick = re.match("^[A-Za-z0-9]{2,20}$", prezdivka)
    if validni_nick:
        pass
    else:
       return False
    if kamarad:
        validni_kamarad = re.match("^[A-Za-z0-9]{2,20}$", kamarad)
        if validni_kamarad:
            pass
        else:
            return False
    return True



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
