from django.http import HttpResponse
from datetime import datetime, timedelta

import requests

def index(request):
    url = "https://www.frankfurter.app/"

    two_years = datetime.now() - timedelta(days = 2 * 365)
    url += f"{two_years.year}-{two_years.month:02}-{two_years.day:02}.."
    print(url)

    currencies = ["CAD", "USD"]
    exchange_data = requests.get(url).json()['rates']
                    
    exchange_data = [{date:{currency: amount[currency] for currency in currencies}} \
                     for date, amount in exchange_data.items()]
    

    return HttpResponse(exchange_data)