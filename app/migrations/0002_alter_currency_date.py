# Generated by Django 4.2.13 on 2024-06-11 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='date',
            field=models.DateField(max_length=12),
        ),
    ]