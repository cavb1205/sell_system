# Generated by Django 4.0.3 on 2022-03-17 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ciudad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Moneda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('codigo', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Tienda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
                ('fecha_registro', models.DateField()),
                ('caja_inicial', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('estado', models.BooleanField(default=True)),
                ('administrador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('ciudad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tiendas.ciudad')),
                ('moneda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tiendas.moneda')),
            ],
        ),
    ]
