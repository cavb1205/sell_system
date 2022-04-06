# Generated by Django 4.0.3 on 2022-03-18 18:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Trabajadores', '0001_initial'),
        ('Gastos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gasto',
            name='trabajador',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='Trabajadores.perfil'),
            preserve_default=False,
        ),
    ]
