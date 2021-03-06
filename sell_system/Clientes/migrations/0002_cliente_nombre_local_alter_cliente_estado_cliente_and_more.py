# Generated by Django 4.0.3 on 2022-06-08 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Clientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='nombre_local',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='estado_cliente',
            field=models.CharField(choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo'), ('Bloqueado', 'Bloqueado')], default=('Activo', 'Activo'), max_length=50),
        ),
        migrations.DeleteModel(
            name='Estado_Cliente',
        ),
    ]
