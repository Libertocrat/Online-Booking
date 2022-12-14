# Generated by Django 4.1.4 on 2022-12-28 00:05

from django.db import migrations, models
import eventcalendar.models


class Migration(migrations.Migration):

    dependencies = [
        ('eventcalendar', '0017_alter_appointment_status_alter_business_time_zone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='customer_name',
            field=models.CharField(blank=True, editable=False, max_length=64),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='customer_phone',
            field=models.CharField(blank=True, editable=False, max_length=14, validators=[eventcalendar.models.validate_phone]),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='service_name',
            field=models.CharField(blank=True, editable=False, max_length=64),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='service_price',
            field=models.DecimalField(blank=True, decimal_places=2, editable=False, max_digits=6),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.IntegerField(choices=[(0, 'New'), (1, 'Confirmed'), (2, 'Completed'), (3, 'Missed'), (4, 'Rejected'), (5, 'Cancelled (By Business)'), (6, 'Cancelled (By Customer)')], default=0),
        ),
    ]
