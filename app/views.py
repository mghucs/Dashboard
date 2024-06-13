from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime, timedelta
from .models import Currency

import requests

def index(request):
    url = "https://www.frankfurter.app/"
    # Just retrieve all data from the table if there exists any. 
    # We need to define more specific parameters of when to 
    # do the API call and for how many entries.

    two_years = datetime.now() - timedelta(days = 2 * 365)

    existing_data = Currency.objects.all()

    res = {}
    if existing_data.exists():
        for data in existing_data:
            res[data.date.strftime('%Y-%m-%d')] = {
                "CAD": data.cad,
                "USD": data.usd
            }
        return JsonResponse(res)
    else:   
        url += f"{two_years.year}-{two_years.month:02}-{two_years.day:02}.."
        exchange_data = requests.get(url).json()['rates']
        for date, amount in exchange_data.items():
            currency = Currency(date = date, usd = amount["USD"], cad = amount["CAD"])
            currency.save()
            res[date] = {}
            for currency, rate in amount.items():
                if currency == "CAD":
                    res[date]["CAD"] = rate
                if currency == "USD":
                    res[date]["USD"] = rate
        return JsonResponse(res)
