# Generated by Django 4.0.3 on 2022-06-08 18:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tiendas', '0004_historicaltienda_historicalcierre_caja'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicaltienda',
            name='administrador',
        ),
        migrations.RemoveField(
            model_name='historicaltienda',
            name='ciudad',
        ),
        migrations.RemoveField(
            model_name='historicaltienda',
            name='history_user',
        ),
        migrations.RemoveField(
            model_name='historicaltienda',
            name='moneda',
        ),
        migrations.DeleteModel(
            name='HistoricalCierre_Caja',
        ),
        migrations.DeleteModel(
            name='HistoricalTienda',
        ),
    ]